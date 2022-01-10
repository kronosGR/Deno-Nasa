import { Application } from "https://deno.land/x/oak@v6.0.1/mod.ts";

const app = new Application();
const PORT = 8000;

app.use((ctx) => {
  ctx.response.body =`
  {___     {__      {_         {__ __        {_       
  {_ {__   {__     {_ __     {__    {__     {_ __     
  {__ {__  {__    {_  {__     {__          {_  {__    
  {__  {__ {__   {__   {__      {__       {__   {__   
  {__   {_ {__  {______ {__        {__   {______ {__  
  {__    {_ __ {__       {__ {__    {__ {__       {__ 
  {__      {__{__         {__  {__ __  {__         {__
                  Mission Control API`;
})

if (import.meta.main){
  app.listen({
    port: PORT
  })
}
