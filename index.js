
import express, { json } from "express";
import {AbortController} from "node-abort-controller";

global.AbortController = AbortController;

const app = express();
app.use(json());



import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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"// This is also the default, can be omitted
});



const port = process.env.PORT || 5000;

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }

    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt,
    //   max_tokens: 64,
    // });

    // const completion = response.data.choices[0].text;

    const completion = await openai.completions.create({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 30,
      });
      console.log(completion.choices[0].text);


    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));