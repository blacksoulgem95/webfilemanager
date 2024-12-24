/**
 * File Manager
 * File Manager Web API for Angular Application
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface CommonFolder { 
    filename: string;
    basePath: string;
    owner: string;
    group: string;
    createdAt: number;
    updatedAt: number;
    fileSize: number;
    isFolder: boolean;
    isHidden: boolean;
    /**
     * Folder content returned on GET operations
     */
    readonly content: Array<any>;
    icon: string;
}