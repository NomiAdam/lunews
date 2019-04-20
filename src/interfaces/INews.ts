export interface INews {
    group: string;
    from: string;
    email: string;
    reference: string | undefined;
    subject: string;
    body: any;
    attachments: any[];
}
