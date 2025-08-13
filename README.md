

# Recommended project — **Pocket Recipes** (recommended)

A small recipe manager that lets users browse, save, add, search, and view recipe details, plus offline storage, images, and simple sharing. It’s very friendly for a single-dev project and can be extended in many directions.

## Why this project?

* Real-world features: lists, forms, images, network calls, local storage, search, and optional camera/image upload.
* Each feature naturally introduces a new RN concept or API.
* Easy to scope: start tiny and add features incrementally.

## Feature roadmap (progressive milestones)

### Milestone 0 — Boilerplate (what you practice)

* `npx react-native init pocket-recipes` (React Native CLI)
* Structure: `screens/`, `components/`, `services/`, `hooks/`
* Concepts: project setup, Metro, running on device, Fast Refresh, basic debugging

### Milestone 1 — Recipe list & details (beginner)

* Feature: static list of recipes → tap to open details screen
* Concepts:

  * `FlatList` for performant lists
  * `Text`, `Image`, `View`, `TouchableOpacity`
  * `React Navigation` stack navigator (install & setup)
  * Pass params between screens
* Deliverable: list page + detail page

### Milestone 2 — Add recipes & forms (state + forms)

* Feature: add a recipe via a form (title, ingredients textarea, steps)
* Concepts:

  * `TextInput`, `KeyboardAvoidingView`, dismiss keyboard on touch outside
  * Controlled inputs + validation
  * `useState` / `useReducer` for form state
  * Simple local state and lifting state up
* Deliverable: Add screen with validation and navigation back to list

### Milestone 3 — Persistence & offline (storage)

* Feature: save recipes persistently
* Concepts:

  * `@react-native-async-storage/async-storage` for local persistence
  * Loading state and showing placeholders
  * Data serialization / migrations
* Deliverable: recipes persist after app restart

### Milestone 4 — Search, filter, and list optimizations

* Feature: search recipes, filter by tag/category
* Concepts:

  * Debounced search (useRef + `setTimeout` or `use-debounce`)
  * `FlatList` optimizations (`keyExtractor`, `getItemLayout`, `initialNumToRender`)
  * Memoization (`React.memo`, `useCallback`, `useMemo`)
* Deliverable: fast search UI, responsive lists

### Milestone 5 — Images & camera

* Feature: attach an image to a recipe (pick from gallery or camera)
* Concepts:

  * `react-native-image-picker` or `expo-image-picker` alternative (note: you said no Expo; use community package)
  * Android/iOS permissions (`PermissionsAndroid`, `Info.plist`)
  * Displaying images, caching small thumbnails
* Deliverable: image picker + show thumbnails in list

### Milestone 6 — Networking (optional remote source)

* Feature: fetch public recipes or user sync
* Concepts:

  * `fetch` / `axios` for HTTP requests
  * Error handling and retry UI
  * Pull-to-refresh on `FlatList`
* Deliverable: remote fetch + refresh handling

### Milestone 7 — State management & offline sync

* Feature: local edits sync to remote / conflict basics
* Concepts:

  * `Context` for app-level state, or small `Redux`/`zustand` demo
  * Optimistic updates
  * Queueing network requests for offline mode
* Deliverable: consistent UI when network is flaky

### Milestone 8 — Animations & polish

* Feature: nice transitions and micro-interactions
* Concepts:

  * `react-native-reanimated` or `Animated` API
  * `LayoutAnimation` for list insert/remove
  * `Pressable` ripple feedback
* Deliverable: smooth open/detail transitions, animated add/remove

### Milestone 9 — Testing, profiling & release basics

* Feature: unit tests & simple profiling
* Concepts:

  * Jest + `@testing-library/react-native` for component tests
  * Flipper + Hermes profiling to find slow renders
  * Build an APK and install on device
* Deliverable: small test suite, Android APK built

### Bonus features (advanced)

* Deep linking (open specific recipe from URL)
* Sharing (native share sheet)
* Pin/Widget (platform-specific)
* Convert to TypeScript and tighten types

## Files & components you’ll create

* `screens/RecipeList.js`, `screens/RecipeDetail.js`, `screens/AddRecipe.js`
* `components/RecipeCard.js`, `components/ImagePicker.js`, `components/SearchBar.js`
* `services/storage.js`, `services/api.js`
* `hooks/useRecipes.js`

---

# Two alternative short projects (pick one as extra)

## 1) Habit Tracker (minimal social features)

* Beginner: list of habits with toggles, streak counter
* Mid: calendar view (`react-native-calendars`), local notifications (`react-native-push-notification`)
* Advanced: charts (small stats) with `react-native-svg` + `recharts` alternative
* Useful concepts: `Switch`, local notifications, date handling, charts, background tasks

## 2) Mini Photo Diary

* Beginner: create entries with photo + caption
* Mid: camera integration and file system (`react-native-fs`), thumbnails and gallery grid using `FlatList` or `SectionList`
* Advanced: upload to simple backend, offline-first uploads, caching
* Useful concepts: camera permissions, image handling, file storage, uploads, progress UI

---

# Which RN concepts you’ll learn across these projects

* Core components/layout (`View`, `Text`, `Image`, `ScrollView`, `FlatList`)
* Navigation (React Navigation stack & tabs)
* Input handling (`TextInput`, form patterns, validation)
* Keyboard management and dismiss patterns
* State: `useState`, `useReducer`, `Context`, optional Redux/zustand
* Persistence: AsyncStorage, simple migrations
* Networking: fetch/axios, error handling, pull-to-refresh
* Media & permissions: camera/gallery, Android permissions, `Info.plist`
* Animations: `Animated`/Reanimated, LayoutAnimation
* Performance: memoization, FlatList optimizations, Hermes/Flipper
* Testing: Jest, react-native testing library
* Build & release basics: CLI builds, APK, provisioning basics for iOS (if you go that far)
* Optional: TypeScript typing and migration patterns

---

# Quick project-scope suggestion (if you want one-week sprints)

* Day 1–2: Setup + List + Navigation
* Day 3: Add form + local state + AsyncStorage
* Day 4: Search + image picker
* Day 5: Networking + pull-to-refresh
* Day 6: Animations + polish
* Day 7: Tests + build APK

---

Want me to:

* generate a starter repo structure (files + example components)?
* or scaffold the first screen (`RecipeList`) so you can run it on your device right away?

Say which one and I’ll output code you can paste into your project.
