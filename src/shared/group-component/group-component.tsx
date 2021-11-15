import React from "react";
import "./group-component.scss";
import { classNames } from "../shared-content";

interface IGroupProps
{
    /** Children of group wrapped in a div.group-content element */
    children: any;

    /** Title of group */
    title?: any;

    /** Custom class name for group (processed by classNames) */
    className?: string;

    /** Component will render only if condition true (if provided) */
    condition?: boolean;

    /** Add JSX element top level of component html structure */
    topLevelElement?: JSX.Element;
}

/**
 * Component for making small named (or not) groups of specific content
 *
 * Classname .semi-transparent changes background to gradient from rgba(black, .04) to transparent
 *
 * Classname .cluster removes padding, background and border, makes block flex with 10px gap
 *
 * @param props title and className, both strings
 * @author re-knownout "knownOut" knownout@hotmail.com
 * @version 0.1.0
 */
export default function Group (props: IGroupProps)
{
    if (props.condition === false) return null;
    return <div className={ classNames("group-component", props.className) }>
        { props.topLevelElement }
        { props.title &&
        <span className="group-title">{ props.title }</span> }
        <div className="group-content">
            { props.children }
        </div>
    </div>;
}
