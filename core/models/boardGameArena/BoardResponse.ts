export interface BoardResponse {
    status: number
    data: BoardResponseData
}

export interface BoardResponseData {
    news: News[]
}

export interface News {
    id: string
    refid: string
    news_type: string
    date_ago: string
    timestamp: string
    thumb: string
    subject_id: string
    user_is_premium: string
    html: string
    img: string
    imgclass: string
    imgadd?: string
    comment_nbr: string
    comment_id?: string
    canRemove: boolean
    canModify: boolean
    original: string
    comment_author?: string
    comment_author_name?: string
    comment_avatar?: string
    comment_text?: string
    comment_date_ago?: string
    comment_canRemove?: boolean
    comment_canModify?: boolean
}