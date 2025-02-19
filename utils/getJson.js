import { createRequire } from 'node:module'

const ROOT = '../json/'

export function getJson(url) {
    return createRequire(import.meta.url)(ROOT+url)
}