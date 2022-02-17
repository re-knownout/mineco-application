import React from "react";

import { ItemObject } from "../../../../control-panel/components/root-form/item-object-renderers/renderers";

import { ApplicationContext } from "../../../application";
import { appRoutesList, serverRoutesList } from "../../../../lib/routes-list";
import convertDate from "../../../../lib/convert-date";

import RemarkConfig from "../../remark-config";
import Carousel from "../../../../common/carousel";

import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

import "./top-block.scss";

/**
 * Component for rendering pinned content (pinned material
 * and important data variable values)
 * @constructor
 * @internal
 */
export default function TopContentBlock (props: { pinnedMaterial: ItemObject.Material }) {
    const context = React.useContext(ApplicationContext);

    const [ topBlockHeight, setTopBlockHeight ] = React.useState<number>();

    const pinnedMaterialElement = React.useRef<HTMLElement | null>();

    // Calculate top block important data section height
    React.useLayoutEffect(() => {
        if (!pinnedMaterialElement.current) return;

        setTimeout(() => {
            if (!pinnedMaterialElement.current) return;

            setTopBlockHeight(pinnedMaterialElement.current.offsetHeight + 40);
        }, 100);
    }, [ pinnedMaterialElement.current ]);

    const importantData = context.variablesData?.importantData;
    if (!importantData) return null;

    // Pinned material preview image link
    const previewImage = serverRoutesList.getFile(props.pinnedMaterial.preview, false);

    // Convert importantData items to JSX elements (for carousel)
    const carouselItems = importantData.map(item =>
        <article className="important-data-block ui flex column relative">
            <ReactMarkdown remarkPlugins={ RemarkConfig }>{ item }</ReactMarkdown>
        </article>);

    return <div className="pinned-data-block ui w-100">
        {/* Full-width bg image */ }
        <div className="background-image ui absolute"
             style={ { backgroundImage: `url(${ previewImage })` } } />

        <Link to={ appRoutesList.material + props.pinnedMaterial.identifier } className="ui clean pinned-material-link">

            {/* Pinned material renderer */ }
            <section className="pinned-material ui flex column relative"
                     ref={ ref => pinnedMaterialElement.current = ref }>
                <div className="material-title ui flex gap column">
                    <span className="title">{ props.pinnedMaterial.title }</span>
                    <span className="date ui opacity-50">
                        { convertDate(new Date(parseInt(props.pinnedMaterial.datetime) * 1000)) }
                    </span>
                    <div className="description ui flex column relative">
                        <ReactMarkdown remarkPlugins={ RemarkConfig } children={ props.pinnedMaterial.description } />
                    </div>
                </div>
                <img src={ previewImage } alt={ props.pinnedMaterial.title } />
            </section>
        </Link>

        {/* Important data variable values renderer through Carousel */ }
        <section className="important-data ui flex relative gap-20"
                 style={ topBlockHeight ? { maxHeight: topBlockHeight - 80 } : {} }>
            <span className="section-title">Важная информация</span>
            <div className="blocks-wrapper ui flex row relative">
                { carouselItems && <Carousel items={ carouselItems } /> }
            </div>
        </section>
    </div>;
}