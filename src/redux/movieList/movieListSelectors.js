// import { createSelector } from 'reselect';

export const getMovies = state => state.moviesList.movies.items;

// export const getContactsLength = state => {
//     const { contacts } = state.contactsList;
//     if (!contacts) return 0;
//     return contacts.length;
// };

export const getMoviesPage = state => state.moviesList.movies.page;

// export const getFilteredContacts = createSelector(
//     [getContacts, getFilter],
//     (contacts, filter) => {
//         if (contacts.length <= 1) return contacts;
//         return contacts.filter(contact =>
//             contact.name.toLowerCase().includes(filter.toLowerCase()),
//         );
//     },
// );
