import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({ icon: Icon, type, ...props }) => {
	const [showPassword, setShowPassword] = useState(false);
	const isPassword = type === 'password';

	return (
		<div className='relative mt-4'>
			{/* Icon on the left */}
			<div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
				{Icon && <Icon className='size-4 text-blue-500' />}
			</div>

			{/* Input field */}
			<input
				{...props}
				type={isPassword ? (showPassword ? 'text' : 'password') : type}
				className='w-full pl-10 pr-10 py-3 bg-white bg-opacity-50 rounded-lg border border-gray-300 
					focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black text-[16px] md:text-[14px] 
					placeholder-gray-400 transition duration-200'
			/>

			{/* Show/Hide toggle (only for password inputs) */}
			{isPassword && (
				<button
					type='button'
					onClick={() => setShowPassword(!showPassword)}
					className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-blue-500'
					tabIndex={-1}
				>
					{showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
				</button>
			)}
		</div>
	);
};

export default Input;
