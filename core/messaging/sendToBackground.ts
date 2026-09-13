export interface BackgroundRequest<TBody = any> {
    name: string;
    body?: TBody;
}

export interface BackgroundResponse<TMessage = any> {
    message: TMessage;
}

export async function sendToBackground<TMessage = any, TBody = any>(
    request: BackgroundRequest<TBody>
): Promise<BackgroundResponse<TMessage>> {
    return chrome.runtime.sendMessage(request);
}
