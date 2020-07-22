import { request, response } from './deps.ts';

export type AllowedUrlsType = {
    '/': boolean;
    '/hill-of-life': boolean;
    '/sculpture-falls': boolean;
    '/twin-falls': boolean;
    '/gus-fruh': boolean;
    '/campbells-hole': boolean;
    '/the-flats': boolean;
    '/barton-springs': boolean;
    '/lost-creek': boolean;
    '/loop-360': boolean;
    '/above-barton-springs': boolean;
};

export type RequestType = typeof request;

export type ResponseType = typeof response;