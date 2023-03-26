<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SchooldjController extends AbstractController
{
    #[Route('/schooldj', name: 'app_schooldj')]
    public function index(): Response
    {
        return $this->render('schooldj/index.html.twig', [
            'controller_name' => 'SchooldjController',
        ]);
    }
}
