# trip-next

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

download node_module `npm install`

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## Tours Search Features

This project implements a tour search by **countries, cities, and hotels**:

### `GeoInput`

* Autocomplete input for countries, cities, and hotels.
* Debounced search with API calls (`fetchCountries`, `fetchGeoSearch`).
* Supports mouse click and **Enter** key selection.
* Props:

    * `value: GeoItem | null`
    * `onChange: (item: GeoItem) => void`
    * `onInputChange: (text: string) => void`
    * `onEnter?: () => void`

### `SearchForm`

* Handles selected `GeoItem` and submits the search.
* Logic:

    * If **country** → search by `countryId`.
    * If **city** or **hotel** → search by the related `countryId`.
* Fetches tours via `useTourSearch` and hotels via `useHotelsCache`.
* Submits on **Enter** or button click, closes suggestions after submit.

### Keyboard & UX

* `Enter` → submit + close suggestions.
* `Escape` → close suggestions.
* Click outside → close suggestions.

---



## Project Structure

```
/app
   /api
     /countries
     /hotel / [hotelId]
     /hotels / [countryId]
      /price / [priceId]
     /search
       /result
       /start
       /stop
     /search-geo
     
  /components
    SearchForm.tsx
    GeoInput.tsx
    ListChoice.tsx
    TourGrid.tsx
    TourCard.tsx
    SearchSection.tsx
    TourDetails.tsx
  /hook
    useTourSearch.ts
    useHotelsCache.ts
    useClickOutside.ts
    useDelaySearch.ts
/lib
  /api
    geo.ts
/pages
  index.tsx (or SearchForm.tsx)
```
Components and Hooks
GeoInput.tsx – main autocomplete for countries, cities, and hotels.
ListChoice/ – renders a drop-down list of options.
SearchForm/index.tsx – search sending and data retrieval logic.
TourGrid/ – tour and hotel participation.
Hooks:
useTourSearch.ts – retrieving tours by CountryId.
useHotelsCache.ts – retrieving/caching hotels.
useClickOutside.ts – closing the drop-down list when clicking outside.
useDelaySearch.ts – deactivating the search.
---

