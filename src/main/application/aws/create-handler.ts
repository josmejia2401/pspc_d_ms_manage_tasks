import Joi from "joi";
import {
    createItemAdapter
} from "../../infrastructure/driving/aws/create-adapter";
import { instrumentLambda } from "../../transversal/http";

export async function createItemHandler(event: any, _context: any) {
    return instrumentLambda(createItemAdapter(), event, {
        bodySchema: Joi.object({
            projectId: Joi.string().required(),
            usersStoryId: Joi.string().required(),
            description: Joi.string().required(),
            name: Joi.string().required(),
            statusId: Joi.number().optional(),
            priorityId: Joi.number().optional(),
            phaseId: Joi.number().optional(),
            estimatedTime: Joi.number().required(),
            actualTime: Joi.number().required(),
            startedAt: Joi.date().optional(),
            completedAt: Joi.date().optional(),
            createdAt: Joi.date().optional(),
        }).required(),
    });
}
