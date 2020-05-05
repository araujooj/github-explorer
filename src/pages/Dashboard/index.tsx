import React, { useState, useCallback, useEffect, FormEvent } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import api from "../../services/api";
import { Title, Form, Repositories, Error } from "./styles";
import Logo from "../../assets/github-explorer.svg";

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories')

    if(storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });
  const [inputError, setInputError] = useState("");
  const [newRepo, setNewRepo] = useState("");

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories))
  }, [repositories])

  const handleAddRepository = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      if (!newRepo) {
        setInputError("Digite o autor/nome do repositório");

        return;
      }

      try {
        const response = await api.get<Repository>(`repos/${newRepo}`);

        const repository = response.data;

        setRepositories([...repositories, repository]);
        setNewRepo("");
        setInputError("");
      } catch {
        setInputError("Erro na busca do repositório");
      }
    },
    [newRepo]
  );
  return (
    <>
      <Link to="/">
        <img src={Logo} alt="Github Explorer" />
      </Link>

      <Title> Explore repositórios no GitHub </Title>

      <Form onSubmit={handleAddRepository} hasError = {!!inputError}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error> {inputError} </Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link to={`/repository/${repository.full_name}`} key={repository.full_name}>
            <img
              alt={repository.owner.login}
              src={repository.owner.avatar_url}
            />
            <div>
              <strong> {repository.full_name} </strong>
              <p> {repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
