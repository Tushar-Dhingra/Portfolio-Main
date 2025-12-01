
export type SiteData = {
    availablity_date: string
}

export type WorkData = {
    id: string,
    title: string,
    details: {
        description: string,
        summary: string
    },
    roles?: string[],
    technologies?: string[],
    links: ({
        type?: "web" | "android" | "ios" | undefined,
        text: string,
        link: string
    } | string)[]
}[]