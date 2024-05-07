import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import Spinner from "../components/Spinner";

const HomePage = () => {
	const [userProfile, setUserProfile] = useState(null);
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);

	const [sortType, setSortType] = useState("recent");
	//分页pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [reposPerPage, setReposPerPage] = useState(10);

	//使用 useCallback() 可以确保 getUserProfileAndRepos 函数只在需要时才重新创建,避免了不必要的重新渲染,从而提高了组件的性能。
	const getUserProfileAndRepos = useCallback(async (username = "lkj") => {
		setLoading(true);
		try {
			const res = await fetch(`/api/users/profile/${username}`);
			const { repos, userProfile } = await res.json();

			repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending, recent first

			setRepos(repos);
			setUserProfile(userProfile);

			return { userProfile, repos };
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	}, []);

	//useEffect() 确保了在组件首次渲染时,就会获取用户信息和仓库列表。
	//将 getUserProfileAndRepos 作为 useEffect() 的依赖项,
	//可以确保组件始终使用最新版本的 getUserProfileAndRepos 函数。这可以避免因函数引用发生变化而导致的潜在问题。
	useEffect(() => {
		getUserProfileAndRepos();
	}, [getUserProfileAndRepos]);

	const onSearch = async (e, username) => {
		e.preventDefault();

		setLoading(true);
		setRepos([]);
		setUserProfile(null);

		const { userProfile, repos } = await getUserProfileAndRepos(username);

		setUserProfile(userProfile);
		setRepos(repos);
		setLoading(false);
		setSortType("recent");
	};

	const onSort = (sortType) => {
		if (sortType === "recent") {
			repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending, recent first
		} else if (sortType === "stars") {
			repos.sort((a, b) => b.stargazers_count - a.stargazers_count); //descending, most stars first
		} else if (sortType === "forks") {
			repos.sort((a, b) => b.forks_count - a.forks_count); //descending, most forks first
		}
		setSortType(sortType);
		
		//我们使用展开语法 [...repos] 创建了一个新的数组引用,然后将其传递给 setRepos 函数。
		//这样做可以确保 React 能够检测到状态变量的改变,从而触发组件的重新渲染,更新页面上的仓库列表。
		setRepos([...repos]); 
		//即使数组的元素没有发生变化,只要数组的引用发生了变化,React 就会认为状态发生了改变,从而触发组件的重新渲染。
		//这个特性是由 React 的比较算法控制的,它被称为 "Shallow Equality Check"。
	};

	return (
		// m-4 表示外边距为 1rem (16px)
		<div className='m-4'> 
			<Search onSearch={onSearch} />
			{repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
				{userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

				{!loading && <Repos repos={repos} />}
				{loading && <Spinner />}
			</div>
		</div>
	);
};
export default HomePage;
