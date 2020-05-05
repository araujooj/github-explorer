import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRouteMatch, Link } from "react-router-dom";

import api from "../../services/api";

import { Header, RepositoryInfo, Issues } from "./styles";
import Logo from "../../assets/github-explorer.svg";

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  title: string;
  id: number;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then((response) => {
      setRepository(response.data)
    });
    api.get(`repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data)
    });
    /** Primeira forma de fazer duas requisições ao mesmo tempo
     *
     *  */
    /* async function loadData(): Promise<void> {
    const [repository, issues] = await Promise.all([
      api.get(`repos/${params.repository}`),
      api.get(`repos/${params.repository}/issues`)
    ])
   }
   loadData() **/
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={Logo} alt="Github Explorer " />
        <Link to="/">
          <FiChevronLeft size={16} /> Voltar{" "}
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            ></img>
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>

          <ul>
            <li>
              <strong>{repository.stargazers_count} </strong>
              <span>Stars </span>
            </li>
            <li>
              <strong>{repository.forks_count} </strong>
              <span>Forks </span>
            </li>
            <li>
              <strong>{repository.open_issues_count} </strong>
              <span>Issues abertas </span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
       {issues.map(issue => (
          <a target='_blank' href={issue.html_url} key = {issue.id}>
          <div>
            <strong> {issue.title} </strong>
            <p>{issue.user.login} </p>
          </div>

          <FiChevronRight size={20} />
        </a>
       ))}
      </Issues>
    </>
  );
};

export default Repository;