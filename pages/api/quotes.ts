import type { NextApiRequest, NextApiResponse } from 'next';
const data = [
  {
    author: 'Bamigboye Olurotimi',
    quote: `Don't argue with a fool, future will teach him some lessons`,
  },
  {
    author: 'Randy Thurman ',
    quote: `A penny saved is worth two pennies earned . . . after taxes. `,
  },
  {
    author: 'Warren Buffett',
    quote: `Do not save what is left after spending; instead spend what is left after saving.`,
  },
  {
    author: 'Vineet Raj Kapoor',
    quote: `Either fill pitchers or live by the river.`,
  },
  {
    author: 'Lailah Gifty Akita',
    quote: `Everything is in excess except money, thereof, it should be well managed..`,
  },
];

export default function quotes(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(data);
}
