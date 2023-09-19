import {
	CorsOptions,
	CorsOptionsDelegate,
} from "@nestjs/common/interfaces/external/cors-options.interface";

export const corsConfig: CorsOptions | CorsOptionsDelegate<any> = {
	origin: "*",
	methods: ["GET", "POST", "PATCH", "DELETE"], // Allow only GET and POST requests
};
