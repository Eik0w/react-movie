import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import { ListItemAvatar } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { MovieFilter, Title } from '@material-ui/icons';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import StarsIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(
	theme => ({
		root: {},
		list: {
			flex: '1 1 32%',
			margin: '0.5%',
		},
	}),
	{ name: 'MyListDetail' }
);

function MyListDetail(props) {
	const { className } = props;
	const classes = useStyles(props);
	let suffixe = '';
	const [content, setContent] = useState([props.content]);
	if (props.type === '$') {
		suffixe = ' $';
	}
	useEffect(() => {
		if (props.type === 'bool') {
			setContent(props.content === 'true' ? 'En cours' : 'Terminé');
		} else {
			setContent(props.content);
		}
	}, [props.content]);

	return props.content !== '' ? (
		<ListItem className={classes.list}>
			<ListItemAvatar>
				<Avatar>{props.icon}</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={
					(props.type === 'link' && (
						<a href={props.content}> {props.content} </a>
					)) ||
					(props.type === 'text' && props.content) ||
					(props.type === '$' && props.content + suffixe) ||
					(props.type === 'bool' && content + suffixe) ||
					(props.type === 'rate' && (
						<Rating
							name="size-large"
							value={props.content / 2}
							size="medium"
							precision={0.1}
							readOnly
						/>
					)) ||
					(props.type === 'cat' &&
						props.content &&
						props.content.map((elem, key) => {
							return (
								<Chip
									key={key}
									icon={<MovieFilter />}
									label={elem.name}
									color="secondary"
								/>
							);
						}))
				}
				secondary={
					props.type === 'rate'
						? props.text + ' - ' + props.content / 2 + '/5'
						: props.text
				}
			/>
		</ListItem>
	) : (
		<></>
	);
}

export default MyListDetail;
