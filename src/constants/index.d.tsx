const labels = {
    navigationLeft: {
        about: 'ABOUT',
        contact: 'CONTACT',
    }
};

const listMenu: ListMenuLeft[] = [
    {
        name: labels.navigationLeft.about,
        url: '/about'
    },
    {
        name: labels.navigationLeft.contact,
        url: '/contact'
    }
];

export default {
    labels,
    listMenu
};