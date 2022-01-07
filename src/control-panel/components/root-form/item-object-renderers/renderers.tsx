import React from "react";
import convertDate from "../../../../lib/convert-date";

/**
 * Namespace for the items that renders in the items list
 * panel (files, materials, maybe something else)
 *
 * @internal
 */
export namespace ItemObject {
    /**
     * Interface for the file item
     */
    export interface File {
        identifier: string;
        filename: string;
        datetime: string;
    }

    /**
     * Interface for the material item
     */
    export interface Material {
        identifier: string;
        title: string;
        description: string;
        tags: string;
        datetime: string;
        preview: string;
    }

    export interface Variable {
        name: string;
        value: unknown;
    }

    /** United type of the Material and File interfaces */
    export type Unknown = Partial<Material & File>;

    /** Possible item types */
    export enum Type {
        materials,
        files,
        variables
    }
}

/**
 * Renderer for the material item object
 * @internal
 *
 * @constructor
 */
export function MaterialRenderer (renderer: ItemObject.Material) {
    // Limit of words for the material description
    const descriptionWordsLimit = 10;

    // Array of all words of the description (not sliced)
    const descriptionWordsArray = renderer.description.split(" ").map(e => e.trim())
        .filter(e => e.length > 0);

    // Description string form the sliced descriptionWordsArray
    let descriptionString = descriptionWordsArray.slice(0, descriptionWordsLimit)
        .join(" ").trim();

    // Add dots to the end of string if limit exceeded
    if (descriptionWordsLimit < descriptionWordsArray.length) descriptionString += "...";

    // Remove extra dots at the end of the description string
    if (descriptionString.slice(-4) == "....") descriptionString = descriptionString
        .slice(0, descriptionString.length - 1);

    return <div className="material-object ui flex column gap padding-20">
        <div className="material-header ui flex row center-ai gap">
            <img src={ renderer.preview } alt={ renderer.title } className="preview-image" />
            <span className="material-title">{ renderer.title }</span>
        </div>

        <div className="material-description ui fz-14 opacity-75">{ descriptionString }</div>
        <div className="material-additional-data ui fz-12 opacity-50 flex column">
            <span className="date">{ convertDate(new Date(parseInt(renderer.datetime) * 1000)) }</span>
            <span className="identifier">#{ renderer.identifier }</span>
        </div>
    </div>;
}

/**
 * Renderer for the file item object
 * @internal
 *
 * @constructor
 */
export function FileRenderer (renderer: ItemObject.File) {
    // Split filename with dot
    const fileNameArray = renderer.filename.split(".");

    // Separate file name and extension
    const fileName = {
        name: fileNameArray.slice(0, -1).join("."),
        extension: fileNameArray.slice(-1)[0]
    };

    return <div className="file-object ui flex column gap-5 padding-20">
        <div className="file-header ui word-break-all">
            <span className="extension-badge ui badge opacity-65 fz-14 lh-28">
                { fileName.extension }
            </span> { fileName.name }
        </div>

        <div className="file-additional-data ui fz-12 opacity-50 flex row wrap gap-5">
            <span className="identifier">#{ renderer.identifier }</span>
            <span className="date">{ convertDate(new Date(parseInt(renderer.datetime) * 1000)) }</span>
        </div>
    </div>;
}

export function VariableRenderer (renderer: ItemObject.Variable) {
    return <div className="variable-object ui flex column gap-5 padding-20">
        <span className="variable-name ui opacity-95 word-break-all">
            { renderer.name }
        </span>

        <div className="variable-badge-holder ui flex row">
            <span className="ui badge opacity-65 fz-12">Переменная</span>
        </div>
    </div>;
}