import { withStateHandlers } from "recompose";
import { LayoutState, LayoutProps, View } from "./component";
import { RouteComponentProps } from "@reach/router";

export const withState = withStateHandlers<
    LayoutState,
    LayoutProps,
    RouteComponentProps
>(
    {
        views: [],
        currentView: -1
    },
    {
        addView: ({ views }) => (view: View) => ({
            views: [...views, view],
            currentView: views.length
        }),
        setCurrentView: () => (index: number) => ({
            currentView: index
        }),
        removeView: ({ views, currentView }) => (index: number) => {
            const currentIsLeftOfDeleted = currentView < index;

            const newViews = [
                ...views.slice(0, index),
                ...views.slice(index + 1, views.length)
            ];

            const newCurrent = currentIsLeftOfDeleted
                ? currentView
                : currentView - 1;

            console.log({ currentIsLeftOfDeleted, newCurrent });
            return {
                views: newViews,
                currentView: newCurrent
            };
        }
    }
);
