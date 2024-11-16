import { z } from "zod";

z.setErrorMap((error, ctx) => {
	if (error.code === "invalid_type") {
		if (error.received === "undefined" || error.received === "null") {
			return { message: "Ce champ est requis" };
		}
	}
	return { message: ctx.defaultError };
});