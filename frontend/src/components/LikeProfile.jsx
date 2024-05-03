import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";//导入了 useAuthContext 函数,这是一个自定义 Hook,用于获取认证相关的上下文。

const LikeProfile = ({ userProfile }) => {
	//这个干嘛的？
	const { authUser } = useAuthContext();
	//通过调用 useAuthContext() 函数,我们可以获取到 authUser 对象,它表示当前已认证的用户。

	const isOwnProfile = authUser?.username === userProfile.login;

	const handleLikeProfile = async () => {
		try {
			const res = await fetch(`/api/users/like/${userProfile.login}`, {
				method: "POST",
				credentials: "include",
			});
			const data = await res.json();

			if (data.error) throw new Error(data.error);
			toast.success(data.message);
		} catch (error) {
			toast.error(error.message);
		}
	};
	//非登陆用户或账号本身的profile就不显示like按钮
	if (!authUser || isOwnProfile) return null;

	return (
		<button
			className='p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2'
			onClick={handleLikeProfile}
		>
			<FaHeart size={16} /> Like Profile
		</button>
	);
};
export default LikeProfile;
