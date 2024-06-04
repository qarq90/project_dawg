import React from 'react';
import styledGlobal from "@/styles/pages/global.module.css";

export function LoadMore(props) {
	const createRipple = (event) => {
		const button = event.currentTarget;

		const existingRipple = button.querySelector('.ripple-effect');
		if (existingRipple) {
			existingRipple.remove();
		}

		const ripple = document.createElement('span');
		ripple.className = 'ripple-effect';
		const rect = button.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		ripple.style.width = ripple.style.height = `${size}px`;
		ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
		ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
		button.appendChild(ripple);
	};

	return (
		<div className={styledGlobal.bottomContainer}>
			<button
				className={styledGlobal.loadMore}
				onClick={(event) => {
					createRipple(event);
					props.onClick(event);
				}}
			>
				Load More
			</button>
		</div>
	);
}
