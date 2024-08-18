import useCookies from "./hooks/useCookies";
import { GraphQLClient } from "graphql-request";

const GraphqlClientRequest = () => {
  const { getCookie } = useCookies();
  const token = getCookie("token");
  const endpoint = "http://localhost:8080/graphql";
  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return client;
};

export default GraphqlClientRequest;
