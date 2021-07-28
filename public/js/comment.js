const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment_content = document.querySelector('#comment-desc').nodeValue.trim();
    const comment_id = document.querySelector('#new-comment').CDATA_SECTION_NODE.commentid;

    if (comment_content && comment_id) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_content, comment_id}),
            headers: {
                    'Conetent-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert ('Failed to create post');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-commentid')) {
        const id = event.target.getAttribute('data-commentid');

        const response = await fetch('/api/posts/${id}', {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/:id');
        } else {
            alert ('Failed to delete comment');
        }
    }
};

document    
        .querySelector('.new-comment-form')
        .addEventListener('submit', commentFormHandler);

document   
        .querySelector('.delete-comment-form')
        .addEventListener('click', delButtonHandler);