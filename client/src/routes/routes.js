import { lazy } from 'react';

const Entry = lazy(() => import('../pages/Entry'));
const ArticleForm = lazy(() => import('../pages/ArticleFormView'));
const ArticleList = lazy(() => import('../pages/ArticleList'));
const ArticleTree = lazy(() => import('../pages/ArticleView'));
const MobileEntry = lazy(() => import('../pages/MobileEntry'));

export const desktopRoutes = [
    {
        path: '/',
        exact: false,
        secure: true,
        Component: Entry,
    },
];

export const mobileRoutes = [
    {
        path: '/list',
        exact: true,
        secure: true,
        Component: ArticleList,
    },
    {
        path: '/article',
        exact: true,
        secure: false,
        Component: ArticleTree,
    },
    {
        path: '/post',
        exact: true,
        secure: true,
        Component: ArticleForm,
    },
    {
        path: '/',
        exact: false,
        secure: true,
        Component: MobileEntry,
    },
];
