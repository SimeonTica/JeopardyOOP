const Category = (categories) => {
    return ( 

        categories.categories.map(category => (
            <div key={ category.id } className='card category'>{ category.category }</div>
        ))

     );
}
 
export default Category;