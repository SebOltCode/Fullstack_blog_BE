import express from 'express';
import pg from 'pg';
const { Client } = pg;
import { getResourceId, returnErrorWithMessage } from './utils.js';


export const createPost = async (req, res) => {
  try {
    const body = req.body;
    if (!body) return returnErrorWithMessage(res, 400, 'Body is required');
    console.log('Here we have access to the body: ', body);
    res.status = (201).json({ message: 'Post created' });
  } catch (error) {
    returnErrorWithMessage(res, 500, 'An error occurred');
  }
};

export const getPosts = async (req, res) => {
  try {
    const client = new Client({ connectionString: 'yourconnectionstring'});
    await client.connect();
    const results = await client.query('SELECT $1::text as message', ['Hello world!']);
    console.log(results.rows[0].message); // Hello world!
    res.status = (200).json; ({ message: 'Posts fetched' });
     } catch (error) {
    console.error('Error fetching posts: ', error);
    returnErrorWithMessage(res, 500, 'An error occurred fetching posts');
  }
};
export const updatePost = (req, res) => {
  const id = getResourceId(req.url);
  console.log('Here we have access to the ID: ', id);
  res.status = (200).json;  ({ message: 'Post updated' }); 
};

export const deletePost = (req, res) => {
  const id = getResourceId(req.url);
  console.log('Here we have access to the ID: ', id);
  res.status = (200).json; ({ message: 'Post deleted' });
 };
 export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = new Client({ connectionString: 'yourconnectionstring'});
    await client.connect();
    const query = 'SELECT * FROM posts WHERE id = $1'; 
    const values = [id];
    const result = await client.query(query, values);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]); 
    } else {
      returnErrorWithMessage(res, 404, 'Post not found');
    }
  } catch (error) {
    console.error('Error fetching post by ID: ', error);
    returnErrorWithMessage(res, 500, 'An error occurred fetching the post');
  }
};