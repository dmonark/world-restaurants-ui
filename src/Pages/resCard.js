import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from  "@material-ui/core/Button"; 
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

const ResCard = function(props) {
	var ratingClass = props.data.rating >= 4.5 ? "rating-excellent" : props.data.rating >= 4 ? "rating-very-good" : props.data.rating >= 3.5 ? "rating-good" : props.data.rating >= 3 ? "rating-average" : props.data.rating === 0 ? "rating-new" : null
	return (
		<Card key={"res"} className="each-res">
			<Grid container spacing={0}>
				<Grid item xs={4}>
					<CardMedia
						style={{width: 150, height: 150}}
						image={"https://b.zmtcdn.com/data/collections/5aa505593a52094ca04d23db6bf12781_1536726619.jpg?fit=around%7C300%3A250&crop=300%3A250%3B%2A%2C%2A"}
						title="Live from space album cover"
					/>
				</Grid>
				<Grid item xs={7}>
					<div>
						<CardContent>
							<Typography component="h2" variant="headline">{props.data.name} </Typography>
							<Typography variant="button" gutterBottom>{props.data.location.locality}</Typography>
							<Typography component="body1">{props.data.location.address}</Typography>
						</CardContent>
					</div>
				</Grid>
				<Grid item xs={1}>
					<CardContent>
					<div className={"rating " + ratingClass }>
						{props.data.rating}
					</div>
					</CardContent>
				</Grid>
			</Grid>
			<Divider />
			<CardContent>
				<Grid container spacing={0}>
					<Grid item xs={4}>
						<Typography component="body2">CUISINES:</Typography>
					</Grid>
					<Grid item xs={8}>
						<Typography component="body1" align="left">{props.data.cuisines}</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography component="body2">COST FOR TWO:</Typography>
					</Grid>
					<Grid item xs={8}>
						<Typography component="body1" align="left">{props.data.cost} in {props.data.currency}</Typography>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions>
				{
					props.data.delivery ? (
						<Button size="small" color="primary">
							Order Online
						</Button>
					) : null
				}
				{
					props.data.booking ? (
						<Button size="small" color="primary">
							Book Table
						</Button>
					) : null
				}				
				<Link href={"https://www.google.com/maps?q="+props.data.location.latitude+","+props.data.location.longitude} target="_blank">
					<Button size="small" color="primary">
						Google Map
					</Button>
				</Link>
			</CardActions>
		</Card>
	);
};
  
export default ResCard;