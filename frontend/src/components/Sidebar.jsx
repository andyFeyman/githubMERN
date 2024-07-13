import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md";
import Logout from "./Logout";
import { useAuthContext } from "../context/AuthContext";

const Sidebar = () => {
	//Sidebar需要根据登陆态进行样式展示，所以这里useAuthContext导入authUser,这样就能实时检查登陆态。
	const { authUser } = useAuthContext();
	//<aside> 元素用于创建侧边栏，包含一个导航菜单，而 <nav> 元素用于包含侧边栏中的导航链接。
	//在aside-nav-link之间插入{}来写判断逻辑，&&逻辑符号，意味着需要登陆的用户才能看到进一步的内容
	//link中的to的属性值，跟vite.config.js中的配置有关系。
	return (
		<aside
			className='flex flex-col items-center min-w-12 sm:w-16 sticky top-0 left-0 h-screen py-8
      overflow-y-auto border-r bg-glass'
		>
			<nav className='h-full flex flex-col gap-3'>
				<Link to='/' className='flex justify-center'>
					<img className='h-8' src='/github.svg' alt='Github Logo' />
				</Link>

				<Link
					to='/'
					className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg 
					hover:bg-gray-800'
				>
					<IoHomeSharp size={20} />
				</Link>


				{/* 在aside-nav-link之间插入{}来写判断逻辑，&&逻辑符号，意味着需要登陆的用户才能看到进一步的内容 */}
				{authUser && (
					<Link
						to='/likes'
						className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800'
					>
						<FaHeart size={22} />
					</Link>
				)}

				{authUser && (
					<Link
						to='/explore'
						className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800'
					>
						<MdOutlineExplore size={25} />
					</Link>
				)}
	
				{!authUser && (
					<Link
						to='/inscription'
						className='p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-800'
					>
						<IoHomeSharp size={25} />
					</Link>
				)}


				{!authUser && (
					<Link
						to='/login'
						className='p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-800'
					>
						<PiSignInBold size={25} />
					</Link>
				)}

				{!authUser && (
					<Link
						to='/signup'
						className='p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-800'
					>
						<MdEditDocument size={25} />
					</Link>
				)}

				{authUser && (
					<div className='flex flex-col gap-2 mt-auto'>
						<Logout />
					</div>
				)}

				{!authUser && (
					<Link
						to='/detailPage'
						className='p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-800'
					>
						<IoHomeSharp size={25} />
					</Link>
				)}
			</nav>
		</aside>
	);
};
export default Sidebar;
