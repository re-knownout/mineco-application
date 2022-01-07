import React from "react";
import classNames from "../../lib/class-names";
import "./loading.scss";

/**
 * Component for creating fullscreen loaders
 *
 * @constructor
 */
export default function Loading (props: { children?: string, display: boolean, error?: any }) {
    const rootClassName = classNames("loading-component ui container", {
        display: props.display,
        error: Boolean(props.error)
    });

    return <div className={ rootClassName }>
        <div className="ui content-wrapper padding grid center">
            { !props.error && <i className={ classNames("ui loading-spinner", { big: !props.children }) } /> }
            { !props.error && props.children && <span className="text">{ props.children }</span> }
            { props.error && <div className="error-form ui flex column limit-380">
                <span className="ui title margin optimize">
                    Произошла ошибка
                </span>
                <span className="ui sub-title margin optimize">
                    Попробуйте немного подождать и перезагрузить страницу. Если данная ошибка появляется снова, обратитесь
                    к администратору
                </span>
                <span className="error-text ui opacity-50 margin optimize">{ (typeof props.error === "object"
                    && "message" in props.error)
                    ? props.error.message
                    : String(props.error) }</span>
            </div> }
        </div>
    </div>;
}

/**
 * Component for creating loaders that fits in the parent element
 *
 * @constructor
 */
export function LoadingWrapper (props: { display: boolean }) {
    const rootClassName = classNames("loading-wrapper ui grid center", { display: props.display });

    return <div className={ rootClassName }>
        <i className="ui loading-spinner" />
    </div>;
}