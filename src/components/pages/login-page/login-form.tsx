import React from "react";
import {Button} from '@/components/commons/ui/button.tsx';
import {Input} from '@/components/commons/ui/input.tsx';
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from '@/components/commons/ui/form.tsx';
import {Card, CardContent} from '@/components/commons/ui/card.tsx';
import {Link} from 'react-router-dom';
import {useLoginForm} from "@/lib/hooks/auth/use-login-form.ts";
import {ConnectionApi} from "@/api/connection-api.ts";
import {Message} from "@/components/commons/ui/alert.tsx"
import Paragraph from "@/components/commons/ui/paragraph.tsx";

export const LoginForm: React.FC = () => {

    const {loginFormSchema, isSubmitting, errorMessage, submitLoginForm} = useLoginForm(new ConnectionApi());

    return (
        <Card className="mb-20 w-full border-none px-2 shadow-none">
            <CardContent>
                <form className="grid gap-6">
                    <Form {...loginFormSchema}>
                        {errorMessage && <Message message={errorMessage} type={"alert"}/>}
                        <FormField
                            control={loginFormSchema.control}
                            name="identifiant"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Adresse mail</FormLabel>
                                    <FormControl>
                                        <Input autoComplete="identifiant" placeholder="john.doe@gmail.com" {...field}
                                               className="bg-white text-black"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={loginFormSchema.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Mot de passe</FormLabel>
                                    <FormControl>
                                        <Input autoComplete="current-password" type="password" {...field}
                                               className="bg-white text-black"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center justify-between">
                            <Link to={"/"} className="text-sm underline">
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        <div className="flex w-full flex-col items-end mb-10">
                            <FormControl>
                                <Button onClick={loginFormSchema.handleSubmit(submitLoginForm)} disabled={isSubmitting}>
                                    {isSubmitting ? 'Connexion en cours...' : 'Connexion'}
                                </Button>
                            </FormControl>
                        </div>

                        <Paragraph className={"text-nowrap"}>Vous n’avez pas encore de compte ? <Link to={"/"} style={{color: "#988DFE"}}>Créez le tout de suite en cliquant ici.</Link></Paragraph>
                    </Form>
                </form>
            </CardContent>
        </Card>
    );
};
