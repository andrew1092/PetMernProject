import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import { Card, CardContent, Typography, Button, CardMedia, CardActions, CardActionArea } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import { list } from './api-shop.js'
import { Link } from 'react-router-dom'
import DeleteShop from './DeleteShop.jsx';

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
    textAlign: 'center',
    fontSize: '1.2em'
  },
  avatar: {
    width: 100,
    height: 100
  },
  subheading: {
    color: theme.palette.text.secondary
  },
  shopTitle: {
    fontSize: '1.2em',
    marginBottom: '5px'
  },
  details: {
    padding: '24px'
  }
}))
export default function Shops() {
  const classes = useStyles()
  const [shops, setShops] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    list(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setShops(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }

  }, [])

  const removeShop = (shop) => {
    const updatedShops = [...shops]
    const index = updatedShops.indexOf(shop)
    updatedShops.splice(index, 1)
    setShops(updatedShops)
  }

  return (
    <div>
      {/* <Paper className={classes.root} elevation={4}> */}
      <Typography type="title" className={classes.title}>
        Products
      </Typography>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', maxWidth: '1000px', margin: '0 auto' }}>
        {shops.map((shop, i) => {
          return <div>
            <Card style={{ width: '300px', height: '300px', margin: '10px' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  src={'/api/shops/logo/' + shop._id + "?" + new Date().getTime()}
                  alt={shop.name}
                  style={{ objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {shop.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {shop.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link to={"/seller/product/edit/" + shop._id}>
                  <Button size="small" color="primary">
                    Update
                  </Button>
                </Link>
                <DeleteShop shop={shop} id={i} onRemove={removeShop}/>
              </CardActions>
            </Card>
            <Divider />
          </div>
        })}
      </div>
      {/* </Paper> */}
    </div>)
}
