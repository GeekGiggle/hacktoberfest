//GET (read)

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import mongoose from 'mongoose';

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) {
            return new Response("Prompt not found", {
                status: 404
            });
        }

        return new Response(JSON.stringify(prompt), {
            status: 200
        });
    } catch (error) {
        return new Response("Failed to fetch prompt", {
            status: 500
        });
    }
}



//PATCH (update)
export const PATCH = async (request, {params}) => {
    const {prompt ,tag} = await request.json();

    try{

        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not found",{
            status:404
        })

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{
            status:200
        })

    }catch(error){
        return new Response("Failed to update prompt",{
            status:500
        })
    }
}

//DELETE (delete)
// export const DELETE = async (request,{params}) => {
//     try{
//         await connectToDB();

//         if (!params.id) {
//             return new Response("Prompt ID is required", {
//                 status: 400
//             });
//         }

//         const result = await Prompt.findByIdAndRemove(params.id);

//     if (!result) {
//       return new Response("Prompt not found", {
//         status: 404,
//       });
//     }

//         return new Response("Prompt deleted successfully",{
//             status:200
//         })
//     }catch{
//         return new Response("Failed to delete prompt",{
//             status:500
//         })
//     }
// }

export const DELETE = async (request, { params }) => {
    try {
      // Establish a connection to the database
      await connectToDB();
  
      // Validate ObjectId
      if (!params.id || !mongoose.isValidObjectId(params.id)) {
        console.error("Invalid Prompt ID:", params.id);
        return new Response("Invalid Prompt ID", {
          status: 400,
        });
      }
  
      // Try to delete the prompt by ID
      const result = await Prompt.findByIdAndDelete(params.id);
  
      if (!result) {
        console.error("Prompt not found with ID:", params.id);
        return new Response("Prompt not found", {
          status: 404,
        });
      }
  
      return new Response("Prompt deleted successfully", {
        status: 200,
      });
    } catch (error) {
      console.error("Error deleting prompt:", error); // Log the error for debugging
      return new Response(`Failed to delete prompt: ${error.message}`, {
        status: 500,
      });
    }
  };