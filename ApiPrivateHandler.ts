import { NextApiRequest, NextApiResponse } from "next";

const shouldHasAccess = (referer?: string): boolean | undefined => {
	const supportedHosts = [process.env.DB_HOSTS_1, process.env.DB_HOSTS_2];
	let access: boolean | undefined = false;
	supportedHosts.forEach(host => {
		if (!access && host && referer) {
			access = referer.includes(host);
		}
	});
	return access;
}

const ApiPrivateHandler = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if(!shouldHasAccess(req.headers.referer)) {
            return res.status(403).json({success: false, message: `Forbidden`})
        }
        return handler(req, res)
    }
}

export default ApiPrivateHandler;