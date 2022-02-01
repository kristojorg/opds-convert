import convert from "lib/convert";
import { GetServerSideProps } from "next";

type Props =
  | { json: ReturnType<typeof convert>; error: undefined }
  | {
      json: undefined;
      error: { statusCode: number; message: string; document: any };
    };

export default function View(props: Props) {
  if (props.error) {
    return <div>{props.error.message}</div>;
  }

  return (
    <div>
      <pre>{props.json}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const opdsUrl = ctx.query.opdsUrl as string | undefined;
  if (!opdsUrl) {
    return {
      notFound: true,
    };
  }
  const response = await fetch(opdsUrl);
  if (!response.ok) {
    return {
      props: {
        error: {
          statusCode: response.status,
          message: response.statusText,
          document: await response.json(),
        },
      },
    };
  }
  const xml = await response.text();
  const result = JSON.stringify(convert(xml), undefined, 2);

  return {
    props: {
      json: result,
    },
  };
};
