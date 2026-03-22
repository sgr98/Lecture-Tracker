# Design Choices

This doc records the journey of how some decisions came to be in this project. This is serves as a basket where I am throwing all the reasearch that went into the project. A lot of this is taken from Gemini.

<br>

---
---
---

<br>

# 4. JavaScript Class Design For UI

```
I have list of subjects that I call from the DB using an API. The response is an array of javascript objects with few attributes. I am desiging UI in such a way that requires more attributes in the object.

From API response:
{
	id,
	subjectName,
	subjectCode,
	subjectDescription,
	courseList,
}

But, with UI I also need, order, isDeleted, newPosition, etc.

I am using javascript classes to describe both the API Response and UI subject. Can you suggest a way to design here?
```

This is a classic architectural challenge in frontend development: the tension between your **Domain Model** (what the database says) and your **View Model** (what the screen needs).

Since you are already using JavaScript classes, the most robust way to handle this is through **Composition** or a **View Model Wrapper**. This keeps your API logic "pure" while giving your UI the flexibility it needs.

---

## The "View Model" Pattern

Instead of trying to force your API class to hold UI state, create a `SubjectViewModel` that **wraps** the raw data. This avoids "polluting" your backend data structure with temporary UI flags like `isDeleted` or `newPosition`.



### 1. The Domain Class (API Response)
Keep this focused strictly on what the server sends back.

```javascript
class Subject {
  constructor(data) {
    this.id = data.id;
    this.subjectName = data.subjectName;
    this.subjectCode = data.subjectCode;
    this.subjectDescription = data.subjectDescription;
    this.courseList = data.courseList || [];
  }
}
```

### 2. The View Model Class (UI State)
This class takes an instance of `Subject` and adds the "transient" properties needed for your UI.

```javascript
class SubjectViewModel {
  constructor(subject, order = 0) {
    // Composition: Store the original subject
    this.data = subject; 

    // UI-specific properties
    this.order = order;
    this.isDeleted = false;
    this.newPosition = null;
    this.isEditing = false; // Example of another useful UI flag
  }

  // Use getters to make accessing core data easier
  get name() {
    return this.data.subjectName;
  }

  // Logic for UI interactions
  toggleDelete() {
    this.isDeleted = !this.isDeleted;
  }
}
```

---

## Why this approach is better

| Feature | Inheritance (`class UI extends API`) | Composition (`ViewModel`) |
| :--- | :--- | :--- |
| **Separation** | Blurs the line between DB and UI. | Clear boundary; raw data remains untouched. |
| **Serialization** | Harder to send back to API (extra keys). | Easy: just send `this.data` back to the server. |
| **Flexibility** | Rigid structure. | You can have different ViewModels for different screens. |
| **Testing** | Requires mocking the whole chain. | You can test UI logic independently of data. |

---

## Practical Implementation (The Mapping)

When you receive your API response, you can map the array directly into your ViewModels:

```javascript
async function fetchSubjects() {
  const response = await api.get('/subjects');
  
  // Transform raw data into UI-ready objects
  return response.map((item, index) => {
    const baseSubject = new Subject(item);
    return new SubjectViewModel(baseSubject, index);
  });
}
```

### Pro Tip: The "To JSON" trick
When it's time to save your data back to the database, you don't want to send `isDeleted` or `newPosition` to the server (it might throw a 400 error). Because we used composition, your "save" logic is simple:

```javascript
const payload = subjectViewModels.map(vm => vm.data);
// Now 'payload' is back to the original API format!
```

Would you like me to show you how to handle the state updates for these classes if you are using a framework like React or Vue?


<br>

---
---
---
---
---
---
---
---
---
---
---
---

<br>


# 3. UI Controller Communication Patterns

```
Suppose I have 3 classes A, B and C that are controllers for UI containing event listeners for buttons on UI. A instantiates B and C. Suppose B has button that when clicked makes A go into editMode. This editMode is also supposed to be passed into C because it alters the behaviours of other elements in C. How shall I achieve this?
```

This is a classic architectural challenge in UI development: **sibling communication**. Since B and C don't know about each other, Class A must act as the "Mediator" or "Orchestrator."

The most robust way to handle this is the **"Notify Up, Flow Down"** pattern.

---

### 1. The Callback / Delegate Pattern (Recommended)
This is the most straightforward approach for simple hierarchies. Class B notifies its creator (A) that an event happened, and Class A pushes that state down to C.



#### The Flow:
1.  **B defines a Callback:** B has a function pointer, interface, or event listener that it triggers when the button is clicked.
2.  **A listens to B:** When A instantiates B, it "hooks" into that callback.
3.  **A updates C:** Inside that callback, A changes its own `editMode` state and immediately calls a method on C (e.g., `c.setEditMode(true)`).

**Why this works:** B and C remain completely decoupled. B doesn't need to know C exists, and vice-versa.

---

### 2. The Observer Pattern (Events)
If your application is likely to grow (e.g., more classes besides C need to know about `editMode`), you should use an **Event Bus** or **Pub/Sub** model.

* **Step 1:** Define a custom event like `EditModeChanged`.
* **Step 2:** When the button in B is clicked, B dispatches this event to A (or a global event bus).
* **Step 3:** C "subscribes" to this event during its initialization.
* **Step 4:** When the event fires, C updates its internal behavior automatically.

---

### 3. Shared State Model (The "State Store")
If `editMode` is a global state that many components care about, passing it manually can become "prop drilling" (tedious passing of data through many layers).

Instead, create a **UIState** object:
| Component | Action |
| :--- | :--- |
| **State Object** | Holds a boolean `isEditMode` and allows observers to watch it. |
| **Class B** | Updates `StateObject.isEditMode = true` on click. |
| **Class C** | Observes `StateObject`. When it changes, C updates its elements. |

---

### Summary of Implementation

If you want a quick, "clean code" solution right now, use the **Callback** approach in Class A:

```javascript
// Logic inside Class A (The Parent)
this.b = new B();
this.c = new C();

// A listens to B
this.b.onEditButtonClicked = () => {
    this.editMode = true; 
    this.c.setEditMode(true); // A pushes the change to C
};
```

**Direct Correction:** Avoid giving Class B a direct reference to Class C. This creates "tight coupling," making your code fragile and very hard to test or modify later. Always communicate through the parent (A) or a neutral third party (an Event Bus or State Store).


<br>

---
---
---
---
---
---
---
---
---
---
---
---

<br>

# 2. Passing Object vs. Individual variables as arguments to function signature

```
If I am tackling a javascript object and I have to send it down to multiple functions, is it better to unwrap the key properties of the object that are being used and send it individually as function arguments or just send the object and unwrap it repeatedly in those respective functions?
```

This is a classic "Clean Code" debate. Like many things in software engineering, the "better" approach depends on the context of your data and how much you value flexibility versus explicitness.

Here is a breakdown of both strategies to help you decide.


## Option 1: Passing the Whole Object

This is often called **"Parameter Objects"** or passing by reference.

  * **Pros:**
      * **Easier Maintenance:** If you need to add a fourth property to five different functions, you don't have to change the function signatures; you just update the logic inside.
      * **Cleaner Call Sites:** `processUser(user)` looks much tidier than `processUser(user.id, user.name, user.email, user.role)`.
  * **Cons:**
      * **Hidden Dependencies:** It’s not immediately clear which parts of the object the function actually needs without reading the function body.
      * **Harder to Test:** You have to mock an entire object even if the function only uses one string from it.

-----

## Option 2: Unwrapping (Individual Arguments)

This involves destructuring the object at the call site and passing only what is necessary.

  * **Pros:**
      * **Pure & Explicit:** The function signature acts as documentation. You know exactly what the function requires to run.
      * **Decoupling:** The function doesn't need to know the "shape" of your main object, making it more reusable across different parts of your app.
  * **Cons:**
      * **Argument Fatigue:** Once you hit 4 or more arguments, the function becomes difficult to read and easy to break (ordering matters unless you use a destructured object as a single argument).

-----

## The "Middle Ground" Winner: Destructured Arguments

In modern JavaScript, the most balanced pattern is to **pass the object but destructure it in the function signature.** This gives you the best of both worlds.

```javascript
// The best of both worlds
function updateProfile({ name, email }) { 
  // You see exactly what is used
  console.log(`Updating ${name} to ${email}`);
}

// Call site remains clean
updateProfile(user);
```

### Decision Matrix

| Scenario | Recommended Approach |
| :--- | :--- |
| **Small, utility functions** (e.g., `formatName`) | **Unwrap.** Pass only the strings/numbers needed. |
| **Large domain objects** (e.g., `User`, `Order`) | **Pass the Object.** It’s likely to evolve, and you don't want to refactor 10 functions every time a schema changes. |
| **Deeply nested functions** | **Unwrap early.** Don't pass a "God Object" down 5 levels if the 5th level only needs one ID. |

### My Advice

If these functions are tightly coupled to the data (e.g., they are all "User" related functions), **pass the object**. If the functions are generic (e.g., a function that just formats a date), **unwrap the date** and pass it individually so the function can work with any date, not just one hidden inside a specific object.

<br>

---
---
---

<br>

```
You said
I too think that Destructured Arguments would be the best option but in my case the object is formed using constants and accessed in the same way:

e.g) const id = this._currentSubject[DBSubjectConstants.ID];

In this case, what do you suggest?
```

This specific detail changes the math quite a bit. When you are dealing with **dynamic keys** or **constants-based access**, the code can quickly become "noisy" and difficult to scan.

If you have to repeat `this._currentSubject[DBSubjectConstants.ID]` inside four different functions, you’re not just unwrapping; you’re cluttering your logic with implementation details about your database schema.

Here is how I suggest handling this to keep your code readable and maintainable:

## The "Adapter" Pattern (Pre-Unwrapping)

Since your object keys are tied to constants (likely for mapping to a database or API), you should **unwrap once** at the top level and pass the clean, named variables down.

This acts as a "translation layer" between your raw data and your business logic.

```javascript
// 1. Extract and Rename at the entry point
const {
  [DBSubjectConstants.ID]: id,
  [DBSubjectConstants.NAME]: name,
  [DBSubjectConstants.EMAIL]: email
} = this._currentSubject;

// 2. Pass the clean variables
this.validateUser(id, email);
this.formatDisplay(name);
this.saveLog(id);
```

### Why this is better for your case:

  * **Decoupling:** If `DBSubjectConstants.ID` ever changes from `"uuid"` to `"id"`, you only change the extraction line. Your functions (which just expect a variable called `id`) don't care.
  * **Readability:** `func(id)` is much easier to read than `func(obj[CONST.ID])`.
  * **Debugging:** When you hover over a variable in your debugger, you see the value immediately, rather than having to resolve a constant-key lookup on an object.

## When to stick with the Object

If you find yourself passing **6 or more** of these properties to every single function, the "clean variable" approach starts to feel like a lot of boilerplate. In that scenario, I recommend creating a **Plain Old JavaScript Object (POJO)** first:

```javascript
// Create a "Clean" version of the object
const subject = {
  id: this._currentSubject[DBSubjectConstants.ID],
  name: this._currentSubject[DBSubjectConstants.NAME],
  email: this._currentSubject[DBSubjectConstants.EMAIL]
};

// Now you can use the Destructured Argument pattern comfortably
this.performAction(subject);

function performAction({ id, name }) {
  // Logic here is clean and constant-free
}
```

### My Recommendation

If you are passing 1–3 properties, **unwrap them into local variables** using the constants and pass them individually. It makes your functions "purer" and easier to move to other files later.

If you are passing a large chunk of the object, **map the "constant-key" object to a "normal-key" object** once, then pass that new object around. Avoid letting those `DBSubjectConstants` leak into the deep logic of your sub-functions.

Would you like to see how to use a **Getter** or a **Class** to automate this mapping so you don't have to write that extraction logic every time?

<br>

---
---
---
---
---
---
---
---
---
---
---
---

<br>

# 1. Testing

Software testing is a massive field, but most experts group the "hundreds" of specific tests into two main buckets: Functional (does it work?) and Non-Functional (how well does it work?)

### 1. Functional Testing (The "What")
These tests verify that the software does exactly what the business requirements say it should do

| Type | What it tests | When/Where to use it |
| :--- | :--- | :--- |
| **Unit Testing** | Individual functions or components in isolation. | During coding; developers use this to catch bugs before they even reach the "test" phase. |
| **Integration Testing** | How different modules or APIs talk to each other. | When connecting a database to a frontend or linking two different microservices. |
| **System Testing** | The entire application from start to finish. | Once the build is "complete" but before it's shown to the client. |
| **Sanity/Smoke Testing** | Basic "is it alive?" check of core features. | Right after a new build is deployed to ensure the "engine" at least turns over. |
| **User Acceptance (UAT)** | Final check by actual users or clients. | The very last step before "Go-Live" to ensure it meets the customer's vision. |


### 2. Non-Functional Testing (The "How")
These tests focus on the user experience, reliability, and security of the system.

* **Performance Testing:**
    * **Load Testing:** Can the site handle 1,000 users at once? Useful for preparing for a product launch.
    * **Stress Testing:** What happens if 50,000 users join? Useful for finding the "breaking point" of your servers.
* **Security Testing:** Checks for vulnerabilities like data leaks or unauthorized access. Critical for banking, healthcare, or any app handling personal data.
* **Usability Testing:** Focuses on whether the app is intuitive. Useful for UX designers to see if real people get stuck on a specific menu.
* **Compatibility Testing:** Does it look the same on an iPhone, an Android, and a 4K monitor? Essential for apps with a diverse user base.


### 3. Specialized & Emerging Types (2026 Trends)
In 2026, testing has evolved to include more specialized areas as technology changes:

* **Accessibility (A11y) Testing:** Ensures the app is usable for people with disabilities (screen readers, high contrast, etc.). This is increasingly a legal requirement.
* **API Testing:** Testing the "pipes" of the internet. Since most modern apps are just a collection of APIs, this is where many bugs are found today.
* **AI/ML Model Testing:** Checking for bias or "hallucinations" in AI features.
* **Regression Testing:** Re-running old tests after a new update to make sure you didn't accidentally break something that was working fine yesterday.


### Which one should you prioritize?
If you are building a small project, start with **Unit Tests** and **Manual Functional Tests**. If you are launching a global app, **Performance** and **Security** become just as important as the code itself.

<br>

---
---
---

<br>

## Testing Strategy

To give you a strategy that actually works without drowning you in paperwork, I’ve broken this down into a **Tiered Testing Strategy**. This approach focuses on high ROI (return on investment)—catching the most expensive bugs as early as possible.


### The "Shift-Left" Strategy
The goal is to test "early and often." The further to the left (earlier in development) you catch a bug, the cheaper it is to fix.

#### Phase 1: The Foundation (Development)
* **Unit Testing (Automated):** Developers write these alongside the code. 
    * *Goal:* Ensure a single logic gate or function works.
* **Static Code Analysis:** Using tools to scan code for "smells" or security vulnerabilities before it’s even run.



#### Phase 2: The Core (Integration & API)
* **API Testing:** If your frontend and backend don't talk correctly, the UI doesn't matter. Test the endpoints for correct data types and error codes (like 404s or 500s).
* **Integration Testing:** Verify that your database is correctly storing what your API is sending.

####**** Phase 3: The User Experience (UI & Manual)
* **Regression Testing (Automated):** Every time you add a new feature, run a script that clicks through the "Happy Path" (Login, Checkout, Profile) to ensure old features didn't break.
* **Exploratory Testing (Manual):** Give the app to someone who didn't build it and tell them to "try to break it." Humans are much better at finding weird edge cases than scripts.


### 📋 The "Pre-Launch" Checklist
Use this checklist before you push any major update to production:

| Category | Task | Priority |
| :--- | :--- | :--- |
| **Critical** | Can a user complete the primary "Money Flow" (e.g., Buy, Sign Up)? | High |
| **Security** | Are API keys or passwords visible in the browser console? | High |
| **Performance** | Does the main page load in under 3 seconds on a 4G connection? | Medium |
| **Compatibility** | Does the layout break on a mobile screen? | Medium |
| **Accessibility** | Can the app be navigated using only a keyboard (Tab/Enter)? | Low/Legal |


### When to Automate vs. Manual
Don't try to automate everything—it's a trap that leads to brittle tests that break every time you change a button's color.

* **Automate:** Repetitive tasks, complex calculations, and "smoke tests" (checking if the app starts).
* **Manual:** Visual polish, UX "feel," and new features that are still changing rapidly.


## Integration Tests vs End-to-end tests

This is one of the most common points of confusion in software engineering because, on the surface, they both involve "multiple pieces working together."

The shortest way to distinguish them: **Integration tests** verify the "handshake" between two specific parts, while **End-to-End (E2E) tests** verify the entire "handshake" of the user's journey from start to finish.

### 1. Integration Testing: The "Plumbing"
Integration tests focus on the communication between two or more components (e.g., your code and a database, or two microservices). 

* **Scope:** Narrow. It usually isolates a specific interaction.
* **Environment:** Often uses "mocks" or "stubs" for parts of the system that aren't being tested. For example, you might test your API’s connection to a real database but "fake" the connection to a third-party payment gateway like Stripe.
* **Speed:** Fast to medium. Since you aren't loading a whole browser or every single service, these run quickly in a deployment pipeline.
* **Example:** Testing if a `User` object is correctly saved to the PostgreSQL database when the `create_user` function is called.


### 2. End-to-End (E2E) Testing: The "User"
E2E tests simulate a real user’s behavior in a real-world scenario. They treat the entire application as a "black box."

* **Scope:** Broad. It covers everything from the Frontend UI to the Backend API, the Database, and even third-party integrations.
* **Environment:** Needs a "Production-like" environment. This usually requires a browser automation tool (like Selenium, Playwright, or Cypress) to click buttons and read text on a screen.
* **Speed:** Slow. Because it has to wait for pages to load, network latency, and animations, these are the slowest tests in your suite.
* **Example:** Opening a Chrome browser, navigating to the login page, typing credentials, clicking "Submit," and verifying that the "Welcome" dashboard appears.


### Key Differences at a Glance

| Feature | Integration Testing | End-to-End (E2E) Testing |
| :--- | :--- | :--- |
| **Perspective** | Developer/Architect | End User |
| **Goal** | Ensure modules communicate correctly. | Ensure the system fulfills a business requirement. |
| **Failures** | Easy to debug (you know exactly which link broke). | Hard to debug (could be a UI bug, a network lag, or a database timeout). |
| **Dependencies** | Minimal (often uses mocks). | Total (requires the full stack to be "up"). |


### The "Testing Pyramid" Rule
In a healthy codebase, you should follow the **Testing Pyramid** logic:

1.  **Unit Tests (Most):** Cheap, fast, hundreds of them.
2.  **Integration Tests (Middle):** Fewer than unit tests; cover critical connections.
3.  **E2E Tests (Fewest):** Only for the most critical user paths (like "Checkout" or "Sign Up"), because they are expensive to maintain and slow to run.

<br>

---
---
---

<br>

## When to use E2E and when to use integration tests

In my case, it was between Cypress (E2E) or vitest with simulated browser (Integration tests).

While it feels easier to just use Cypress for everything since it has a "real" browser, here is why a hybrid approach is usually the winner.

---

### 1. The Problem with "E2E Only"
If you move all your integration logic to Cypress, you will encounter these three hurdles:
* **Execution Time:** 100 Vitest integration tests might take 5 seconds. 100 Cypress tests might take 5 minutes.
* **Brittleness:** E2E tests fail often due to "flakiness" (network lag, animations taking too long, or a database cleanup failing).
* **Debugging:** When an E2E test fails, you know the *feature* is broken, but you don't necessarily know *where* in the code it broke.

---

### 2. When to use Vitest + JSDOM (The "Fast" Integration)
JSDOM is not a real browser, but it is excellent for testing **Component Logic**. You should keep using Vitest for things that don't require a full visual render.

**Use Vitest for:**
* **Form Validation:** Does the "Submit" button disable when the email input is invalid?
* **State Changes:** If I click a "Toggle" button, does the specific `div` get the `.active` class?
* **Data Transformation:** If my API returns a list of dates, does my JS function format them correctly for the UI?



---

### 3. When to use Cypress/Playwright (The "True" E2E)
Save your E2E tools for the **"Happy Path"** and **Critical User Journeys**. 

**Use Cypress for:**
* **The Full Flow:** A user lands on the homepage, searches for a product, adds it to the cart, and sees the "Success" message.
* **Cross-Browser Issues:** Does this layout actually work in a Chromium-based engine? (JSDOM can't tell you if a CSS `grid` layout is broken).
* **Third-Party Interactivity:** Does the Google Login popup actually redirect back to my app?

---

### 4. The Balanced Approach (2026 Best Practice)
Since you are using Vanilla JS, your "Integration" tests in Vitest are essentially testing your **DOM Manipulation logic**. 

| Test Type | Tool | Environment | What to test |
| :--- | :--- | :--- | :--- |
| **Unit** | Vitest | Node | Pure functions (math, string formatting). |
| **Integration** | Vitest + JSDOM | Simulated Browser | Event listeners, DOM updates, API mocking. |
| **E2E** | Cypress / Playwright | Real Browser | Full user flow, DB persistence, UI visuals. |



#### My Recommendation:
1.  **Don't scrap the Vitest/JSDOM setup.** Use it for the "heavy lifting" of testing your UI logic. It’s too fast to give up.
2.  **Add Cypress for the "Critical 5".** Identify the 5 most important things a user does in your app. Write E2E tests for only those. 
3.  **Mock your APIs in Vitest.** This keeps your integration tests lightning fast because they never actually touch the internet.


