export type HomeProps = { message: string }; /* could also use interface */
export const Home = ({ message }: HomeProps) => <div>{message}</div>;