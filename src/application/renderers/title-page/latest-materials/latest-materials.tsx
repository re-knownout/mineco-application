import React from "react";

import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import Button from "../../../../common/button";

import { ItemObject } from "../../../../control-panel/components/root-form/item-object-renderers/renderers";
import convertDate from "../../../../lib/convert-date";

import { appRoutesList, serverRoutesList } from "../../../../lib/routes-list";
import { setWordsLimit } from "../../../../lib/words-limit";

import remarkConfig from "../../remark-config";

import "./latest-materials.scss";

/**
 * Component for rendering the latest materials list
 * @constructor
 * @internal
 */
export default function MaterialsList (props: { materials: ItemObject.Material[] }) {
    // Materials limit for current window size
    const [ limit, setLimit ] = React.useState(2);

    /**
     * Window resize event handler for recalculating materials limit
     */
    function windowResizeHandler () {
        let nextLimit = Math.floor(window.innerWidth / 360);
        nextLimit = nextLimit > 2 ? nextLimit : 2;

        if (nextLimit != limit) setLimit(nextLimit);
    }

    React.useLayoutEffect(() => {
        window.addEventListener("resize", windowResizeHandler);
        windowResizeHandler();

        return () => window.removeEventListener("resize", windowResizeHandler);
    });

    return <>
        <section className="latest-materials-block ui padding-20">
            { props.materials.slice(0, limit).reverse().map((material, index) =>
                <Material material={ material } key={ index } />) }
        </section>
        <Link to="tag/Новости" className="ui clean color-white materials-archive-link">
            <Button className="materials-archive-button">Перейти в архив новостей</Button>
        </Link>
    </>;
}

interface MaterialProps
{
    material: ItemObject.Material;
    wordsLimit?: number;

    reference? (ref: HTMLAnchorElement | null): void;
}

/**
 * Material renderer for latest materials
 * list renderer
 *
 * @constructor
 * @internal
 */
export function Material (props: MaterialProps) {
    const previewImage = serverRoutesList.getFile(props.material.preview, false);
    const rootElementRef = React.useRef<HTMLElement | null>(null);

    const [ height, setHeight ] = React.useState(0);

    React.useLayoutEffect(() => {
        setTimeout(() => {
            if (height > 100) return;
            if (rootElementRef.current) setHeight(rootElementRef.current.offsetHeight);
        }, 100);
    }, [ rootElementRef, rootElementRef.current?.offsetHeight ]);

    return <Link to={ appRoutesList.material + props.material.identifier } className="ui clean material-link"
                 ref={ ref => props.reference && props.reference(ref) }
                 style={ height ? { minHeight: height, maxHeight: height } : {} }>
        <article className="material ui" ref={ ref => rootElementRef.current = ref }>
            <div className="preview-image" style={ { backgroundImage: `url(${ previewImage })` } } />
            <div className="material-data ui flex column gap-5 lh-22 padding-20">
                <span className="material-title ui fz-20 fw-700 lh-26">{ props.material.title }</span>
                <span className="date ui opacity-65">
                    { convertDate(new Date(parseInt(props.material.datetime) * 1000)) }
                </span>
                <div className="description ui clean">
                    <ReactMarkdown remarkPlugins={ remarkConfig }
                                   children={ setWordsLimit(props.material.description, props.wordsLimit
                                       ? props.wordsLimit : 60) } />
                </div>
            </div>
            <div className="extra-controls ui absolute flex row">
                <Button>Читать далее</Button>
            </div>
        </article>
    </Link>;
}
