# Product Requirements Document: Studio Ghibli Films Application

## Introduction/Overview

This document outlines the requirements for building a responsive React application that displays Studio Ghibli film information. The application will feature an interactive card-based interface where users can explore four specific Studio Ghibli films through a GraphQL-powered backend that integrates with the public Studio Ghibli API.

**Problem Statement**: Users need an intuitive, visually appealing way to discover and explore detailed information about Studio Ghibli films, with smooth interactions that work seamlessly across desktop and mobile devices.

**Goal**: Create a polished, responsive web application that demonstrates modern React development practices, GraphQL integration, and excellent user experience design.

## Goals

1. Provide users with an engaging interface to explore four Studio Ghibli films (Porco Rosso, Kiki's Delivery Service, Howl's Moving Castle, My Neighbor Totoro)
2. Deliver smooth, interactive card-based interactions with 3D flip animations
3. Ensure full mobile responsiveness down to 320px width
4. Implement proper loading states and error handling for all user interactions
5. Achieve full WCAG accessibility compliance
6. Demonstrate clean code architecture with GraphQL backend integration
7. Complete implementation within approximately 4 hours

## User Stories

1. **As a user**, I want to see four film buttons when the page loads, so that I can immediately understand what films are available to explore.

2. **As a user**, I want to click a film button to fetch and display that film's information, so that I can learn about the film.

3. **As a user**, I want to see a loading indicator when I click a film button, so that I know the application is working and fetching data.

4. **As a user**, I want to see a film card with the movie image and title after clicking a button, so that I can visually identify the film.

5. **As a desktop user**, I want to hover over a film card to see detailed information, so that I can explore film details without clicking.

6. **As a mobile user**, I want to tap a film card to see detailed information, so that I can explore film details on touch devices.

7. **As a user**, I want to see film details (banner, description, director, release date, runtime, Rotten Tomatoes score) when I interact with a card, so that I have comprehensive information about the film.

8. **As a mobile user**, I want the cards to display in a single column layout, so that the interface is easy to navigate on small screens.

9. **As a user**, I want to see appropriate error messages if a film cannot be loaded, so that I understand what went wrong.

10. **As a user with accessibility needs**, I want the application to be fully keyboard navigable and screen reader compatible, so that I can use the application regardless of my abilities.

## Functional Requirements

### Frontend Requirements

1. **Initial State**: The application must display four film buttons immediately upon page load, each labeled with one of the following film names:

   - Porco Rosso
   - Kiki's Delivery Service
   - Howl's Moving Castle
   - My Neighbor Totoro

2. **Film Button Interaction**: When a user clicks a film button, the application must:

   - Disable the clicked button
   - Display a spinner on the button
   - Trigger a GraphQL query to fetch the film data from the backend
   - Replace the button with a film card once data is received

3. **GraphQL Integration**: The frontend must:

   - Use GraphQL codegen to generate properly typed hooks (useQuery, useLazyQuery, etc.)
   - Call the GraphQL backend resolver to fetch individual film data
   - Handle GraphQL query responses with proper TypeScript typing

4. **Film Card Display (Front)**: Each film card must display:

   - Movie image (from API data)
   - Movie title

5. **Film Card Display (Back)**: When a card is flipped (hover on desktop, click on mobile), it must reveal:

   - Movie banner image
   - Film description
   - Director name
   - Release date
   - Runtime (in minutes)
   - Rotten Tomatoes score

6. **Card Flip Animation**: Cards must use a 3D CSS transform flip animation when:

   - Desktop: User hovers over the card
   - Mobile: User taps/clicks the card

7. **Card Layout**: The application must display cards in:

   - Grid layout (2x2) on desktop screens
   - Single column layout on mobile devices (below breakpoint)

8. **Loading States**: When a film button is clicked:

   - The button must be disabled
   - A spinner must be displayed on or within the button
   - The button must remain in this state until the query completes (success or error)

9. **Error Handling**: When a film fetch fails, the application must:

   - Display an error message on the card (replacing the button)
   - Show a toast/notification with error details
   - Display a fallback state that allows the user to retry

10. **Responsive Design**: The application must:

- Function properly and look good on screens as narrow as 320px width
- Reorganize cards into a single column on mobile devices
- Ensure touch interactions work smoothly for card flipping on mobile
- Maintain usability and visual appeal across all screen sizes

11. **Data Caching**: The application must:

- Cache fetched film data in memory with expiration
- Avoid unnecessary refetches of already-loaded films
- Allow cache invalidation when needed

12. **Accessibility**: The application must:

- Meet full WCAG compliance standards
- Support keyboard navigation for all interactive elements
- Provide proper ARIA labels and roles
- Ensure screen reader compatibility
- Maintain proper focus management

### Backend Requirements

13. **GraphQL Resolver**: The backend must provide a GraphQL resolver that:

- Accepts a film ID as input
- Fetches film data from the Studio Ghibli API (https://ghibliapi.vercel.app/)
- Returns the film data in the GraphQL response
- Acts as a minimal proxy server (no data persistence required)

14. **GraphQL Schema**: The backend must:

- Define proper GraphQL object types for film data
- Update the schema (objectTypes) to properly type all resolver return data
- Include all required fields: image, title, banner, description, director, release_date, running_time, rt_score

15. **API Integration**: The backend must:

- Connect to the public Studio Ghibli API
- Handle API errors gracefully
- Return properly formatted GraphQL responses

16. **Film Data Mapping**: The backend must map the following Studio Ghibli API IDs to film names:

- `ebbb6b7c-945c-41ee-a792-de0e43191bd8` → Porco Rosso
- `ea660b10-85c4-4ae3-8a5f-41cea3648e3e` → Kiki's Delivery Service
- `cd3d059c-09f4-4ff3-8d63-bc765a5184fa` → Howl's Moving Castle
- `58611129-2dbc-4a81-a72f-77ddfc1b1b49` → My Neighbor Totoro

## Non-Goals (Out of Scope)

1. **Data Persistence**: The backend will not persist or cache film data to a database. It acts as a proxy only.

2. **User Authentication**: No user accounts, login, or authentication features are required.

3. **Film Search**: Users cannot search for films beyond the four specified films.

4. **Film Favorites/Bookmarks**: No ability to save or favorite films.

5. **Film Reviews/Comments**: No user-generated content features.

6. **Multiple Language Support**: The application will be in English only.

7. **Offline Functionality**: The application requires an active internet connection to function.

8. **Film Recommendations**: No recommendation engine or related films feature.

9. **Video Playback**: No video trailers or film clips will be displayed.

10. **Social Sharing**: No social media sharing capabilities.

## Design Considerations

1. **Design Reference**: Follow general layout and styling guidelines from the Zeplin designs: https://app.zeplin.io/project/6883f9f0cd284cd950c6fd3a

2. **Card Design**:

   - Cards should have a modern, polished appearance
   - Front of card: Prominently display film image and title
   - Back of card: Organize detailed information in a readable layout
   - Ensure sufficient contrast for text readability

3. **Animation**:

   - 3D CSS transform flip should be smooth (recommended duration: 300-500ms)
   - Use CSS transforms (rotateY) for the flip effect
   - Ensure animation is performant and doesn't cause jank

4. **Color Scheme**: Follow the design system and theme already established in the codebase (check `packages/frontend/src/shared/styles/theme/`)

5. **Typography**: Use the existing typography system from the theme

6. **Spacing**: Maintain consistent spacing between cards and elements

7. **Button Design**: Film buttons should be visually distinct and clearly indicate they are clickable

8. **Loading Indicators**: Spinner should be clearly visible and appropriately sized

9. **Error States**: Error messages should be clear, user-friendly, and provide actionable information

10. **Mobile Touch Targets**: Ensure all interactive elements meet minimum touch target size (44x44px recommended)

## Technical Considerations

1. **Frontend Stack**:

   - React with TypeScript
   - Apollo Client for GraphQL
   - GraphQL Code Generator for type-safe queries
   - Styled Components and MUI for styling (per workspace rules)
   - Vite as the build tool

2. **Backend Stack**:

   - GraphQL server (Apollo Server)
   - TypeScript
   - HTTP service for API calls to Studio Ghibli API

3. **Code Organization**:

   - Follow existing project structure
   - Use functional components with TypeScript interfaces
   - Prefer named exports
   - Use arrow functions for components

4. **State Management**:

   - Use React hooks for local component state
   - Apollo Client cache for GraphQL data
   - Consider React Query patterns if needed

5. **Error Handling**:

   - Implement error boundaries where appropriate
   - Provide user-friendly error messages
   - Log errors appropriately (consider existing logging setup)

6. **Performance**:

   - Optimize images (lazy loading if needed)
   - Minimize re-renders
   - Use efficient data fetching strategies
   - Cache API responses appropriately

7. **Testing**:

   - Ensure existing tests continue to pass
   - Add tests for new components where feasible (time permitting)

8. **Accessibility Implementation**:

   - Use semantic HTML elements
   - Implement proper ARIA attributes
   - Ensure keyboard navigation works for all interactions
   - Test with screen readers
   - Maintain proper focus indicators

9. **Mobile Considerations**:

   - Use touch-friendly interactions
   - Test on actual mobile devices or responsive design tools
   - Ensure viewport meta tag is properly configured
   - Consider mobile performance (reduce animations if needed)

10. **GraphQL Schema Design**:
    - Follow existing schema patterns in the codebase
    - Ensure types match Studio Ghibli API response structure
    - Consider nullability of fields appropriately

## Success Metrics

1. **Functional Completeness**: All four films can be successfully loaded and displayed
2. **User Experience**: Smooth card flip animations with no jank or lag
3. **Responsive Design**: Application works flawlessly on mobile devices (320px+)
4. **Accessibility**: Application passes WCAG compliance checks and is fully keyboard navigable
5. **Error Handling**: All error scenarios are handled gracefully with user-friendly messages
6. **Code Quality**: Code compiles without TypeScript errors, builds successfully, and contains no debugging code
7. **Performance**: Film data loads within reasonable time (< 2 seconds on average connection)
8. **Design Fidelity**: Application matches general design guidelines from Zeplin

## Open Questions

1. **Cache Expiration Time**: What should be the cache expiration time for film data? (Suggested: 5-10 minutes)

2. **Card Flip Behavior**: Should cards flip back automatically when hover ends on desktop, or remain flipped until clicked again?

3. **Multiple Cards**: Can users load all four films simultaneously, or should clicking a new film button replace the previous card?

4. **Button State After Load**: After a film is loaded, should the button remain visible (disabled) or be completely replaced by the card?

5. **Error Retry**: Should error states include an automatic retry mechanism, or only manual retry?

6. **Loading Multiple Films**: If a user clicks multiple buttons in quick succession, how should loading states be managed?

7. **Card Animation Timing**: What is the preferred animation duration for the card flip? (Suggested: 400ms)

8. **Rotten Tomatoes Score Format**: How should the Rotten Tomatoes score be displayed? (e.g., "95%", "95/100", "95")

---

**Document Version**: 1.0  
**Last Updated**: [Current Date]  
**Target Completion Time**: ~4 hours
