export interface FriendsResponse {
    status: number
    data: Data
}

export interface Data {
    friends: Friend[]
    inbound: number
    outbound: number
    group: number
}

export interface Friend {
    id: string
    name: string
    avatar: string
    status: string
    device: string
    last_seen: string
    is_premium: string
    is_beginner: string
    current_table_id: any
    game_name: any
    table_status: any
}
