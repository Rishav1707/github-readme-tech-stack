import { Request, Response } from "express";
import Card from "../cards/card";
import { getThemeByName } from "../cards/themes";
import SvgGenerator from "../svg/svg-generator";

const cardController = (req: Request, res: Response) => {
  // an empty card
  const card = new Card();

  // if the user doesn't specify a title, we use the default one
  const title = req.query.title;
  card.setTitle(title?.toString() || "My Tech Stack");

  // using the getThemeByName() function
  const theme = req.query.theme;
  card.setTheme(getThemeByName(theme?.toString() || ""));

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(new SvgGenerator(card).toString());
};

export default cardController;