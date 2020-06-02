export interface ISendSlackMessage {
    content: string;
}

export interface AuthedUser {
    id: string;
}

export interface Team {
    id: string;
    name: string;
}

export interface ISlackInfo {
    ok: boolean;
    app_id: string;
    authed_user: AuthedUser;
    scope: string;
    token_type: string;
    access_token: string;
    bot_user_id: string;
    team: Team;
}