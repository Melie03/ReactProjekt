import { ClientActionFunctionArgs, redirect, useNavigate } from '@remix-run/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SyntheticEvent } from 'react';
import { createCollection, collectionQueryOptions } from '~/apis/collection-api';

export async function clientAction({ request }: ClientActionFunctionArgs) {
    const formData = await request.formData();
    const title = formData.get('title');

    if (!title || typeof title !== 'string') {
        throw new Error('missing title');
    }

    await createCollection(title);

    return redirect('/app/collections');
}

export default function CreateCollectionPage() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: (title: string) => createCollection(title),
        onSuccess: () => {
            queryClient.invalidateQueries(collectionQueryOptions);
            navigate('/app/collections');
        },
    });

    const isSubmitting = mutation.isPending;

    const onSubmitHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const title = formData.get('title');

        if (typeof title !== 'string') {
            throw Error('missing title');
        }

        mutation.mutate(title);
    };

    return (

            <div className="max-w-md">
            <h1 className="mb-6">Create a new collection</h1>

            <form onSubmit={onSubmitHandler} className="flex gap-4 flex-col" method="post">
                <label className="flex gap-3 items-baseline">
                    <div className="w-40">Collection title:</div>

                    <div className="flex-auto">
                        <input aria-label="Collection" name="title" type="text" required />
                    </div>
                </label>

                <button className="ml-auto" type="submit" disabled={isSubmitting}>
                    Submit
                </button>
            </form>
        </div>
    );
}
