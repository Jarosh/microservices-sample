export interface Order {
    _id: string;
    id_user: string;
    state: 'created'|'cancelled'|'confirmed'|'delivered';
    items?: string[];
    summary?: string;
    created_at: string;
    updated_at: string;
}
