import { z } from "zod";

export const zAirticle = z.object({    
    title:z.string(),
    content:z.string(),
    user_id:z.number()
});
